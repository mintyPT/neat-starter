---
prose: true
title: index
layout: funnel
blocks:
  - title: Top Banner
    className: bg-orange-400
    blocks:
      - blocks:
          - className: prose prose-xl text-white
            richText: |
              Yellow
            _template: content
        _template: container
    _template: wrapper
  - title: Container TOP
    blocks:
      - className: text-center prose mx-auto
        richText: ''
        content: >-
          <h2>READY TO GROW YOUR GYM TO</h2>

          <h1>£40k/ Month?</h1>

          <h3>AND MANAGE IT IN 10 HOURS A WEEK OR LESS?</h3>

          <h3>Get LIVE Coaching, Strategies & Workshops From a Multi-Studio
          Owner for Only £47/month!</h3>

          <div class="">Get LIVE Coaching, Strategies & Workshops From a
          Multi-Studio Owner for Only £47/month! </div>
        _template: content
      - text: a
        link: '#'
        _template: callToAction
      - className: text-center prose mx-auto
        richText: ''
        content: 'There is NO contract and NO minimum length - you can cancel ANYTIME '
        _template: content
    _template: container
  - title: Black
    className: bg-black text-white
    blocks:
      - title: 2 columns
        grid: true
        blocks:
          - richText: ''
            content: left
            _template: content
          - richText: ''
            content: Right
            _template: content
        _template: container
    _template: wrapper
_template: funnel
---

