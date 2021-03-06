---
layout: post
comments: true
title: "난감한 제목태그 디자인.. 구현법을 알아내다"
excerpt: ""
thumb: true
header:
  overlay_image: /assets/images/thumb/css_thumb01.png
  overlay_filter: 0.3
date: 2019-12-09 21:17
categories:
    - css
    - design
tags:
    - css
    - design
---
가끔 이런 제목태그 디자인을 봤을 것임.

<figure class="auto-alt jc--center">
    <img src="/assets/images/post/heading-style_img01.png" alt="">
    <figcaption>딱 봤을 땐 뭐가 문제인지 모르겠으나.. 텍스트가 한 줄 이상이 된다면?</figcaption>
</figure>

<figure class="auto-alt jc--center">
    <img src="/assets/images/post/heading-style_img02.png" alt="">
    <figcaption>이런 보기 싫은 광경이 펼쳐진다.</figcaption>
</figure>
어떻게 CSS를 줘야 할지 감이 잡히지 않는데, <code>background-image</code>를 높은 확률로 <code>position:absolute</code>, <code>calc</code> 등으로 잡아보지만 당연히 줄에 맞게 떨어질리가 없다. 구글링으로 얻은 몇 가지 방법을 소개하겠음.

{:.h2}
## box-shadow를 이용한 방법
<p class="codepen" data-height="265" data-theme-id="default" data-default-tab="html,result" data-user="selucky" data-slug-hash="wvBXdgq" style="height: 265px; box-sizing: border-box; display: flex; align-items: center; justify-content: center; border: 2px solid; margin: 1em 0; padding: 1em;" data-pen-title="wvBXdgq">
  <span>See the Pen <a href="https://codepen.io/selucky/pen/wvBXdgq">
  wvBXdgq</a> by sel (<a href="https://codepen.io/selucky">@selucky</a>)
  on <a href="https://codepen.io">CodePen</a>.</span>
</p>
<script async src="https://static.codepen.io/assets/embed/ei.js"></script>
<hr>
<code>box-shadow</code>를 <code>inset</code> 선언시 그림자가 요소 내부에 생기는 것을 이용한 방법. 기본적으로 제목태그는 block formatting context이므로 줄에 맞게 안 떨어지는데, <code>heading &gt; span</code> 구조를 짜고 <code>span</code>에 스타일을 줘야 정상적으로 보이는 것임. 그럼 제목태그를 <code>inline</code>으로 바꿔주면 되지 않느냐? 상하단 간격을 줄 수 없게 됨. 그렇다고 <code>div &gt; heading</code> 구조는 뭔가 어색한 것 같기도.. 어쨌든 <code>heading &gt; span</code> 구조는 후술할 모든 방법에 해당된다.

텍스트가 한 줄 이상일 때 잘 된다! 근데 알다시피 <code>box-shadow</code>는 IE 9까지 지원하니.. 본인 프로젝트 크로스브라우징 범위를 체크해서 IE 9 이상이면 써도 될 듯. 나님 기본으로 9까지 보고 8까지도 어느 정도 안전장치를 두고 작업하므로 실무에 적용하기엔 그림의 떡이다.. 다만 최신 트렌드 기법 연습을 위해 IE와 거리를 두기로 한 내 블로그에는 적용했음.

{:.h2}
## linear-gradient를 이용한 방법
<p class="codepen" data-height="265" data-theme-id="default" data-default-tab="css,result" data-user="selucky" data-slug-hash="oNgyWZg" style="height: 265px; box-sizing: border-box; display: flex; align-items: center; justify-content: center; border: 2px solid; margin: 1em 0; padding: 1em;" data-pen-title="oNgyWZg">
  <span>See the Pen <a href="https://codepen.io/selucky/pen/oNgyWZg">
  oNgyWZg</a> by sel (<a href="https://codepen.io/selucky">@selucky</a>)
  on <a href="https://codepen.io">CodePen</a>.</span>
</p>
<script async src="https://static.codepen.io/assets/embed/ei.js"></script>
<hr>
<code>linear-gradient</code>는 IE 10까지 지원한다. 그럼 IE 8에서도 문제 없는 방법이 있긴 한건가? 최후의 방법이 하나 남았다.

{:.h2}
## background-repeat로 png 이미지를 반복시키는 방법
<p class="codepen" data-height="265" data-theme-id="default" data-default-tab="html,result" data-user="selucky" data-slug-hash="jOEWLqj" style="height: 265px; box-sizing: border-box; display: flex; align-items: center; justify-content: center; border: 2px solid; margin: 1em 0; padding: 1em;" data-pen-title="jOEWLqj">
  <span>See the Pen <a href="https://codepen.io/selucky/pen/jOEWLqj">
  jOEWLqj</a> by sel (<a href="https://codepen.io/selucky">@selucky</a>)
  on <a href="https://codepen.io">CodePen</a>.</span>
</p>
<script async src="https://static.codepen.io/assets/embed/ei.js"></script>
<hr>
예를 들어 <code>heading</code>의 <code>font-size</code>가 <code>24px</code>라고 가정했을 때, 너비 1px, 높이 8px 정도의 png 이미지를 하나 만들어서 <code>background-image</code>로 삽입 &rarr; 적당한 <code>background-position</code> 잡아주기 &rarr; x축으로 반복시키기.

크로스브라우징 이슈 없는 깔끔한 방법이라고 할 수 있겠다. 참 쉽죠?