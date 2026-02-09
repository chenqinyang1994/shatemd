#!/bin/bash

# 检查网站收录状态脚本
# 用法: ./check-indexing.sh

DOMAIN="sharemd.top"
URL="https://$DOMAIN"

echo "🔍 检查网站收录状态"
echo "━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━"
echo ""

# 检查网站可访问性
echo "📡 1. 检查网站可访问性"
HTTP_CODE=$(curl -s -o /dev/null -w "%{http_code}" "$URL")
if [ "$HTTP_CODE" = "200" ]; then
    echo "   ✅ 网站正常访问 (HTTP $HTTP_CODE)"
else
    echo "   ❌ 网站访问异常 (HTTP $HTTP_CODE)"
fi
echo ""

# 检查sitemap
echo "📄 2. 检查sitemap.xml"
SITEMAP_CODE=$(curl -s -o /dev/null -w "%{http_code}" "$URL/sitemap.xml")
if [ "$SITEMAP_CODE" = "200" ]; then
    echo "   ✅ sitemap.xml 可访问"
else
    echo "   ❌ sitemap.xml 不可访问 (HTTP $SITEMAP_CODE)"
fi
echo ""

# 检查robots.txt
echo "🤖 3. 检查robots.txt"
ROBOTS_CODE=$(curl -s -o /dev/null -w "%{http_code}" "$URL/robots.txt")
if [ "$ROBOTS_CODE" = "200" ]; then
    echo "   ✅ robots.txt 可访问"
else
    echo "   ❌ robots.txt 不可访问 (HTTP $ROBOTS_CODE)"
fi
echo ""

# Google收录查询提示
echo "🔍 4. 手动查询收录状态"
echo ""
echo "   Google收录查询："
echo "   👉 https://www.google.com/search?q=site:$DOMAIN"
echo ""
echo "   百度收录查询："
echo "   👉 https://www.baidu.com/s?wd=site:$DOMAIN"
echo ""
echo "   Bing收录查询："
echo "   👉 https://www.bing.com/search?q=site:$DOMAIN"
echo ""

# 搜索引擎管理工具
echo "🛠️  5. 搜索引擎管理工具"
echo ""
echo "   Google Search Console:"
echo "   👉 https://search.google.com/search-console"
echo ""
echo "   百度搜索资源平台:"
echo "   👉 https://ziyuan.baidu.com/"
echo ""
echo "   Bing站长工具:"
echo "   👉 https://www.bing.com/webmasters"
echo ""

echo "━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━"
echo "✨ 检查完成！"
echo ""
echo "💡 提示："
echo "   - 新站收录需要1-7天"
echo "   - 使用site:命令查询最准确"
echo "   - 搜索引擎后台可查看详细数据"
