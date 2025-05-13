---
title: index
layout: default
blocks:
  - blocks:
      - items:
          - title: Feature 1
            text: Feature text
        _template: features
    _template: container
  - className: my-16
    blocks:
      - tagline: hero tagline
        headline: hero headline
        text: hero text
        _template: hero
    _template: container
  - blocks:
      - richText: ''
        _template: content
      - richText: ''
        _template: content
      - richText: |
          one **two** three
        _template: content
    _template: container
_template: content
---

