---
layout: post
comments: true
title: "CSS 소수점 단위에 대한 생각"
excerpt: ""
thumb: true
header:
  overlay_image: /assets/images/thumb/css_thumb01.png
  overlay_filter: 0.3
date: 2020-01-15 22:12
categories:
    - css
tags:
    - css
---
<p class="codepen" data-height="265" data-theme-id="default" data-default-tab="css,result" data-user="selucky" data-slug-hash="ExapOaq" style="height: 265px; box-sizing: border-box; display: flex; align-items: center; justify-content: center; border: 2px solid; margin: 1em 0; padding: 1em;" data-pen-title="ExapOaq">
  <span>See the Pen <a href="https://codepen.io/selucky/pen/ExapOaq">
  ExapOaq</a> by sel (<a href="https://codepen.io/selucky">@selucky</a>)
  on <a href="https://codepen.io">CodePen</a>.</span>
</p>
<script async src="https://static.codepen.io/assets/embed/ei.js"></script>

<hr>

CSS에서 여러개의 아이템을 균등 분할 시 소수점을 사용해야 균등하게 나눠지는 경우가 있다. 예시로 3개를 나눌 땐 <code>width: 33.33%</code>, 6개는 <code>width: 16.66%</code> 등등.. 엄밀히 말하면 한치의 오차도 없이 &ldquo;정확하게&rdquo; 나눠지는 건 아니다. 100% / 2 = 50%는 정확히 나누어지지만, 100% / 3 = 33.33%는 소수점만큼의 공간이 남는 것임..

어느날 모든 너비값이 애매한 소수점말고 <code>width: 50%</code> 같이 정확하게 나눠진다면 얼마나 좋을까라는 생각이 들었는데, 유명한 방법인 <code>calc</code> 함수를 사용하면 되지만 IE 9까지만 지원되는 단점이 있다.

그래서 생각해낸 방법이 무엇이냐면 &ldquo;태블릿 ~ 모바일에서 <code>calc</code>를 적극 사용해야겠다&rdquo;...

위의 예시 코드를 보면 알겠지만, 각 아이템을 개발자도구로 찍어보면 <code>33.33%</code>는 <code>165.97px</code>, <code>calc(100% / 3)</code>은 <code>166px</code>로 확연히 차이가 나는 것을 볼 수 있다.