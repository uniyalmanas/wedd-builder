'use client'
import React, { useState, useEffect } from 'react';
import { usePortfolioData } from '@/context/wedding-planner/PortfolioDataContext';

export default function StripeCheckoutModal() {
  const { checkoutOpen, setCheckoutOpen, selectedPackage, addLead } = usePortfolioData();
  const [email, setEmail] = useState('');
  const [cardName, setCardName] = useState('');
  const [cardNumber, setCardNumber] = useState('');
  const [expiry, setExpiry] = useState('');
  const [cvc, setCvc] = useState('');
  const [zip, setZip] = useState('');
  const [phone, setPhone] = useState('');
  
  const [status, setStatus] = useState<'idle' | 'processing' | 'success'>('idle');

  // Reset state on open
  useEffect(() => {
    if (checkoutOpen) {
      setStatus('idle');
      setEmail('');
      setCardName('');
      setCardNumber('');
      setExpiry('');
      setCvc('');
      setZip('');
      setPhone('');
    }
  }, [checkoutOpen]);

  if (!checkoutOpen || !selectedPackage) return null;

  // Calculate pricing
  const rawPriceStr = selectedPackage.price.replace(/[^\d]/g, '');
  const rawPrice = parseInt(rawPriceStr, 10) || 500000;
  const deposit = Math.round(rawPrice * 0.1); // 10% deposit
  const formattedDeposit = deposit.toLocaleString('en-IN', { style: 'currency', currency: 'INR', maximumFractionDigits: 0 });
  const formattedFullPrice = rawPrice.toLocaleString('en-IN', { style: 'currency', currency: 'INR', maximumFractionDigits: 0 });

  const handlePay = async (e: React.FormEvent) => {
    e.preventDefault();
    setStatus('processing');
    
    // Simulate transaction delay
    await new Promise((resolve) => setTimeout(resolve, 2000));
    
    const txnId = 'ch_sim_' + Math.random().toString(36).substring(2, 12);
    
    // Save to CRM Leads
    addLead({
      name: cardName || 'Client Name',
      phone: phone || '+91 99999 88888',
      email: email || 'client@example.com',
      date: new Date(Date.now() + 90 * 24 * 3600 * 1000).toISOString().split('T')[0], // 3 months from now
      city: 'To be decided',
      service: selectedPackage.title,
      budget: selectedPackage.price,
      status: 'Paid',
      source: 'Stripe Checkout',
      notes: `Simulated Stripe Checkout Deposit of ${formattedDeposit} paid for package "${selectedPackage.title}". Stripe Transaction ID: ${txnId}.`,
      paidAmount: deposit,
      stripeTxnId: txnId
    });

    setStatus('success');
    
    // Close after success view
    await new Promise((resolve) => setTimeout(resolve, 1500));
    setCheckoutOpen(false);
  };

  const autofillTestCard = () => {
    setCardNumber('4242 •••• •••• 4242');
    setExpiry('12/29');
    setCvc('424');
    setZip('248001');
    setCardName('Manas Uniyal');
    setEmail('manas@waas-platform.com');
    setPhone('+91 98765 43210');
  };

  return (
    <div className="fixed inset-0 bg-charcoal-900/80 backdrop-blur-sm z-50 flex items-center justify-center p-4 font-sans animate-fade-in">
      <div className="bg-white rounded-xl shadow-2xl overflow-hidden max-w-4xl w-full flex flex-col md:flex-row relative animate-scale-in">
        
        {/* Close Button */}
        <button 
          onClick={() => setCheckoutOpen(false)}
          className="absolute top-4 right-4 text-charcoal-400 hover:text-charcoal-900 text-xl font-bold cursor-pointer z-10"
        >
          ✕
        </button>

        {/* Left Side - Stripe Order Summary */}
        <div className="bg-cream-100 p-8 md:p-12 md:w-5/12 flex flex-col justify-between border-r border-cream-200">
          <div>
            <div className="flex items-center gap-2 mb-8">
              <span className="text-gold-600 font-display text-lg font-semibold tracking-wider">VOWS & VISTAS</span>
              <span className="bg-gold-500/10 text-gold-600 border border-gold-500/20 text-[8px] uppercase tracking-widest px-1.5 py-0.5 rounded font-bold">
                PROD TEST
              </span>
            </div>

            <p className="text-xs uppercase font-semibold tracking-wider text-charcoal-500 mb-1">Deposit Due Now (10%)</p>
            <h1 className="text-4xl font-display font-semibold text-charcoal-900 mb-6">{formattedDeposit}</h1>

            <div className="space-y-4">
              <div className="flex justify-between text-sm">
                <span className="text-charcoal-600">{selectedPackage.title} Package</span>
                <span className="font-semibold text-charcoal-900">{formattedFullPrice}</span>
              </div>
              <div className="flex justify-between text-sm">
                <span className="text-charcoal-600">Booking Reservation Deposit</span>
                <span className="font-semibold text-charcoal-900">10%</span>
              </div>
              <div className="border-t border-cream-300 pt-4 flex justify-between text-sm font-semibold">
                <span className="text-charcoal-950">Total Reservation Payment</span>
                <span className="text-charcoal-950">{formattedDeposit}</span>
              </div>
            </div>
          </div>

          <div className="mt-8 text-center md:text-left">
            <span className="text-3xs tracking-widest uppercase text-charcoal-400 font-bold block mb-2">Powered by Stripe</span>
            <p className="text-4xs text-charcoal-400 leading-normal">
              This is a secure checkout sandbox environment. No real funds will be charged. All transactions are local simulation.
            </p>
          </div>
        </div>

        {/* Right Side - Payment form */}
        <div className="p-8 md:p-12 md:w-7/12 flex flex-col justify-center bg-white min-h-[450px]">
          {status === 'idle' && (
            <form onSubmit={handlePay} className="space-y-6">
              <div className="flex justify-between items-center">
                <h2 className="text-lg font-bold text-charcoal-900">Pay with Card</h2>
                <button
                  type="button"
                  onClick={autofillTestCard}
                  className="text-xs text-gold-600 hover:text-gold-700 font-semibold underline flex items-center gap-1 cursor-pointer"
                >
                  ⚡ Autofill Test Info
                </button>
              </div>

              <div>
                <label className="block text-xs font-semibold text-charcoal-600 uppercase tracking-wider mb-2">Email address</label>
                <input
                  type="email"
                  required
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  placeholder="manas@example.com"
                  className="w-full border border-charcoal-200 rounded-lg px-3.5 py-2.5 text-sm focus:outline-none focus:border-gold-500 focus:ring-1 focus:ring-gold-500 text-charcoal-900"
                />
              </div>

              <div>
                <label className="block text-xs font-semibold text-charcoal-600 uppercase tracking-wider mb-2">Phone number</label>
                <input
                  type="text"
                  required
                  value={phone}
                  onChange={(e) => setPhone(e.target.value)}
                  placeholder="+91 98765 43210"
                  className="w-full border border-charcoal-200 rounded-lg px-3.5 py-2.5 text-sm focus:outline-none focus:border-gold-500 focus:ring-1 focus:ring-gold-500 text-charcoal-900"
                />
              </div>

              <div>
                <label className="block text-xs font-semibold text-charcoal-600 uppercase tracking-wider mb-2">Card Information</label>
                <div className="border border-charcoal-200 rounded-lg divide-y divide-charcoal-200">
                  <input
                    type="text"
                    required
                    value={cardNumber}
                    onChange={(e) => setCardNumber(e.target.value)}
                    placeholder="4242 4242 4242 4242"
                    className="w-full px-3.5 py-2.5 text-sm focus:outline-none text-charcoal-900 rounded-t-lg"
                  />
                  <div className="flex divide-x divide-charcoal-200">
                    <input
                      type="text"
                      required
                      value={expiry}
                      onChange={(e) => setExpiry(e.target.value)}
                      placeholder="MM / YY"
                      className="w-1/2 px-3.5 py-2.5 text-sm focus:outline-none text-charcoal-900"
                    />
                    <input
                      type="text"
                      required
                      value={cvc}
                      onChange={(e) => setCvc(e.target.value)}
                      placeholder="CVC"
                      className="w-1/2 px-3.5 py-2.5 text-sm focus:outline-none text-charcoal-900 rounded-br-lg"
                    />
                  </div>
                </div>
              </div>

              <div className="grid grid-cols-2 gap-4">
                <div>
                  <label className="block text-xs font-semibold text-charcoal-600 uppercase tracking-wider mb-2">Name on Card</label>
                  <input
                    type="text"
                    required
                    value={cardName}
                    onChange={(e) => setCardName(e.target.value)}
                    placeholder="Manas Uniyal"
                    className="w-full border border-charcoal-200 rounded-lg px-3.5 py-2.5 text-sm focus:outline-none focus:border-gold-500 text-charcoal-900"
                  />
                </div>
                <div>
                  <label className="block text-xs font-semibold text-charcoal-600 uppercase tracking-wider mb-2">Postal Code</label>
                  <input
                    type="text"
                    required
                    value={zip}
                    onChange={(e) => setZip(e.target.value)}
                    placeholder="248001"
                    className="w-full border border-charcoal-200 rounded-lg px-3.5 py-2.5 text-sm focus:outline-none focus:border-gold-500 text-charcoal-900"
                  />
                </div>
              </div>

              <button
                type="submit"
                className="w-full bg-charcoal-900 hover:bg-gold-600 text-white hover:text-charcoal-950 font-bold py-3.5 rounded-lg transition-all duration-300 shadow-lg cursor-pointer text-sm tracking-wide mt-2"
              >
                Pay {formattedDeposit}
              </button>
            </form>
          )}

          {status === 'processing' && (
            <div className="text-center py-12 space-y-4">
              <div className="w-12 h-12 border-4 border-gold-500 border-t-transparent rounded-full animate-spin mx-auto" />
              <p className="text-sm font-semibold text-charcoal-950">Authorizing card details...</p>
              <p className="text-xs text-charcoal-500">Connecting to simulated Stripe gateways</p>
            </div>
          )}

          {status === 'success' && (
            <div className="text-center py-12 space-y-4 animate-scale-in">
              <div className="w-16 h-16 bg-green-100 text-green-600 rounded-full flex items-center justify-center mx-auto text-3xl font-bold shadow-inner">
                ✓
              </div>
              <h3 className="text-xl font-bold text-charcoal-950">Payment Successful</h3>
              <p className="text-sm text-charcoal-600">Simulated checkouts completed. Lead recorded in owner CRM database.</p>
              <p className="text-2xs text-gold-600 font-bold">Closing reservation details...</p>
            </div>
          )}
        </div>

      </div>
    </div>
  );
}
