---
name: ios-development
description: Guidelines and patterns for iOS and cross-platform mobile development using Swift, React Native, and mobile UI standards.
---

# iOS & Mobile Engineering Playbook

Standard practices for engineering iOS and mobile applications.

## 1. Design & Platform Standards
- Follow Apple Human Interface Guidelines (HIG):
  - Minimum tap target size: 44×44 pt.
  - Respect system safe area insets (Dynamic Island, notch, rounded corners).
  - Support Dynamic Type (font scaling) without text truncation.
  - Implement system haptics for key user interactions (confirmation, warnings).

## 2. Architecture & State
- Separate network, business logic, and UI view layers.
- Implement offline caching (AsyncStorage, SQLite, CoreData) to support degraded network conditions.
- Handle state restoration when apps are backgrounded or suspended by iOS.
