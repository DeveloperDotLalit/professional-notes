# Chapter 04: Post-Release Monitoring

## 1. Crashlytics
The dashboard of health.
- **Velocity Alerts**: "1% of users crashing in last hour". Wake up the engineers.
- **Breadcrumbs**: Use `Crashlytics.log("User tapped X")` to leave a trail before the crash.

## 2. ANRs (Application Not Responding)
Harder to debug than crashes. The OS freezes the app.
- **Play Vitals**: Google Play Console reports ANRs.
- **Common Cause**: DB access on Main Thread, Deadlocks, Slow SharedPreferences.

## 3. Vital Metrics
Google penalizes apps (Search ranking visibility) with bad vitals.
- **Crash Rate**: Should be < 1.09%.
- **ANR Rate**: Should be < 0.47%.
- **Excessive Wakeups**: Draining battery.

[Previous: Chapter 03 - Release](chapter-03-release-management.md) | [Back to Syllabus](../docs/syllabus-overview.md)
