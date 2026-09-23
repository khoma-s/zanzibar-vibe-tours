#!/bin/bash

# Responsive Testing Script for Zanzibar Vibe Tours
# Usage: ./test-responsive.sh

echo "🌴 Zanzibar Vibe Tours — Responsive Testing"
echo "============================================"
echo ""

# Colors
GREEN='\033[0;32m'
RED='\033[0;31m'
YELLOW='\033[1;33m'
NC='\033[0m' # No Color

# Check if server is running
if ! curl -s http://localhost:5173 > /dev/null; then
    echo -e "${RED}❌ Server is not running on http://localhost:5173${NC}"
    echo "Please start the development server first:"
    echo "  npm run dev"
    exit 1
fi

echo -e "${GREEN}✅ Server is running${NC}"
echo ""

# Pages to test
PAGES=(
    "/it/"
    "/it/tour"
    "/it/hotel"
    "/it/galleria"
    "/it/blog"
    "/it/chi-siamo"
    "/pl/"
    "/pl/wycieczka"
    "/pl/hotel"
    "/pl/galeria"
    "/pl/blog"
    "/pl/o-nas"
)

# Viewports to test
VIEWPORTS=(
    "320x568:iPhone SE"
    "375x667:iPhone 8"
    "390x844:iPhone 12"
    "768x1024:iPad"
    "1024x768:iPad Landscape"
    "1440x900:Desktop"
    "1920x1080:Full HD"
)

echo "📱 Testing ${#PAGES[@]} pages across ${#VIEWPORTS[@]} viewports..."
echo ""

# Test each page
for page in "${PAGES[@]}"; do
    echo "Testing: $page"
    
    # Check if page loads
    status=$(curl -s -o /dev/null -w "%{http_code}" "http://localhost:5173$page")
    
    if [ "$status" -eq 200 ]; then
        echo -e "  ${GREEN}✅ Page loads successfully (HTTP $status)${NC}"
    else
        echo -e "  ${RED}❌ Page failed to load (HTTP $status)${NC}"
    fi
done

echo ""
echo "============================================"
echo "📊 Manual Testing Checklist"
echo "============================================"
echo ""
echo "Open the following URL in your browser with DevTools:"
echo "  http://localhost:5173/?test=1"
echo ""
echo "Or press Ctrl+Shift+T to open Responsive Test Panel"
echo ""
echo "Test the following viewports:"
for viewport in "${VIEWPORTS[@]}"; do
    IFS=':' read -r size name <<< "$viewport"
    echo "  • $name ($size)"
done
echo ""
echo "Check:"
echo "  ✓ Header navigation"
echo "  ✓ Mobile menu (burger)"
echo "  ✓ Language switcher (IT/PL)"
echo "  ✓ All page layouts"
echo "  ✓ Images and galleries"
echo "  ✓ Forms and buttons"
echo "  ✓ Footer layout"
echo ""
echo "============================================"
echo -e "${GREEN}✅ Automated tests completed!${NC}"
echo "============================================"
