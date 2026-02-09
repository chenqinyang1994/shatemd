#!/bin/bash

echo "🔍 检查robots.txt修复状态"
echo "━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━"
echo ""

echo "📄 线上robots.txt内容："
echo ""
curl -s https://sharemd.top/robots.txt
echo ""
echo "━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━"
echo ""

# 检查是否还有Content-Signal
if curl -s https://sharemd.top/robots.txt | grep -q "Content-Signal"; then
    echo "❌ 警告：robots.txt中仍然包含 Content-Signal"
    echo "   需要在Cloudflare中关闭AI爬虫管理"
else
    echo "✅ 成功：robots.txt中不再包含 Content-Signal"
fi
echo ""

# 检查行数
LINE_COUNT=$(curl -s https://sharemd.top/robots.txt | wc -l | tr -d ' ')
echo "📊 robots.txt 总行数: $LINE_COUNT"

if [ "$LINE_COUNT" -le 10 ]; then
    echo "✅ 行数正常（简洁版本）"
else
    echo "⚠️  行数较多，可能包含Cloudflare插入的内容"
fi
