import urllib.request
import urllib.parse
import json
import csv
import time
import sys

# Ensure UTF-8 output on Windows terminal if supported, otherwise fall back gracefully
try:
    if hasattr(sys.stdout, 'reconfigure'):
        sys.stdout.reconfigure(encoding='utf-8')
except Exception:
    pass

def search_osm_leads(query, limit=50):
    url = f"https://nominatim.openstreetmap.org/search?q={urllib.parse.quote(query)}&format=json&extratags=1&limit={limit}"
    headers = {
        'User-Agent': 'B2BLeadFinder/1.1 (contact@manasuniyal.com)'
    }
    
    req = urllib.request.Request(url, headers=headers)
    try:
        with urllib.request.urlopen(req) as response:
            res_content = response.read().decode('utf-8')
            data = json.loads(res_content)
            
        if not isinstance(data, list):
            # API returned an error dictionary or alternative payload
            return []
            
        leads = []
        for item in data:
            if not item or not isinstance(item, dict):
                continue
                
            name = item.get('name')
            extratags = item.get('extratags', {})
            if not isinstance(extratags, dict):
                extratags = {}
                
            website = extratags.get('website') or extratags.get('contact:website')
            
            if name and website:
                # Clean website URL
                if not website.startswith('http'):
                    website = 'https://' + website
                    
                address = item.get('display_name') or ""
                leads.append({
                    'title': name,
                    'url': website,
                    'description': f"OSM Record: {address}"
                })
        return leads
    except Exception as e:
        print(f"Error querying OpenStreetMap for '{query}': {e}")
        return []

def main():
    cities = ["London", "New York", "Austin", "Sydney", "San Francisco"]
    keywords = ["design studio", "creative agency", "web developer", "advertising agency"]
    
    filename = "target_agencies.csv"
    print("Starting B2B lead generation via OpenStreetMap Nominatim...")
    print(f"Results will compile into: {filename}\n")
    
    all_leads = []
    seen_urls = set()
    
    for city in cities:
        for keyword in keywords:
            query = f"{keyword} {city}"
            print(f"Querying index for: '{query}'...")
            leads = search_osm_leads(query)
            
            added_count = 0
            for lead in leads:
                clean_url = lead['url'].lower().replace('www.', '').rstrip('/')
                if clean_url not in seen_urls:
                    seen_urls.add(clean_url)
                    all_leads.append(lead)
                    added_count += 1
            print(f"-> Extracted {added_count} new unique agencies with websites.")
            time.sleep(1.5) # Adhere to OSM's polite request limit (1 query / sec)
            
    # Write to target_agencies.csv
    try:
        with open(filename, mode='w', newline='', encoding='utf-8') as f:
            writer = csv.DictWriter(f, fieldnames=['title', 'url', 'description'])
            writer.writeheader()
            for lead in all_leads:
                writer.writerow(lead)
        print(f"\n[Success] Generated {len(all_leads)} high-ticket agency leads in: {filename}")
    except Exception as e:
        print(f"Failed to write CSV: {e}")
        
    print("\nTip: Since OpenStreetMap relies on geocoded maps, you can expand your list further by Ctrl+Clicking these direct search links in your browser:")
    for city in cities:
        search_query = f"boutique web design agency {city}"
        google_url = f"https://www.google.com/search?q={urllib.parse.quote(search_query)}"
        print(f"- {city}: {google_url}")

if __name__ == "__main__":
    main()
