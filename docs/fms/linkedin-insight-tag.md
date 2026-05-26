# LinkedIn Insight Tag Implementation for fmsinc.org

**Status:** Ready to deploy. Confirmed via source audit on 2026-05-24 — Insight Tag is not currently installed.
**Estimated time:** 15 minutes
**Permissions needed:** GTM container access (`GTM-PC8LPTR`) AND a LinkedIn Campaign Manager admin (to retrieve the actual Partner ID; the snippet below uses a placeholder)

---

## Why this matters

Without the LinkedIn Insight Tag installed, FMS cannot:
- Retarget website visitors with LinkedIn ads
- Build website-custom audiences (e.g., "people who viewed the membership page")
- Measure LinkedIn-attributed conversions
- Layer match LinkedIn ad delivery on actual on-site behavior

GA4 (`G-3LY29E9X8M`) and GTM (`GTM-PC8LPTR`) are already live, so the install is a single tag added inside the existing GTM container — no code changes to the Weebly site itself.

---

## Step-by-step install

### 1. Get the LinkedIn Partner ID

Whoever runs FMS's LinkedIn Campaign Manager account:

1. Log in to https://www.linkedin.com/campaignmanager
2. Click the FMS account
3. Top navigation: **Analyze** → **Insight tag**
4. If no tag exists yet, click **Install my Insight Tag**
5. Copy the **Partner ID** (a 7-digit number)

### 2. Install via Google Tag Manager

1. Log in to https://tagmanager.google.com
2. Open the FMS container (`GTM-PC8LPTR`)
3. **Tags** → **New** → **Tag Configuration**
4. Search for and select **LinkedIn Insight**
5. Paste the Partner ID from Step 1
6. **Triggering** → choose **All Pages**
7. Name the tag: `LinkedIn Insight Tag - All Pages`
8. **Save**
9. Top right: **Submit** → **Publish**

### 3. Verify the install (within 5 minutes of publishing)

Open https://fmsinc.org in Chrome with the LinkedIn Insight Tag Helper extension installed (or just check the network tab for requests to `snap.licdn.com`). Tag should fire on every page.

Or check in LinkedIn Campaign Manager: **Analyze** → **Insight tag** → status should change from "Inactive" to "Active" within 24 hours.

---

## Raw JS fallback (if GTM isn't available)

If FMS's webmaster can't access GTM, the tag can be installed directly in Weebly's site header instead. Paste this into Weebly Settings → SEO → Header Code:

```html
<script type="text/javascript">
_linkedin_partner_id = "YOUR_PARTNER_ID_HERE";
window._linkedin_data_partner_ids = window._linkedin_data_partner_ids || [];
window._linkedin_data_partner_ids.push(_linkedin_partner_id);
</script>
<script type="text/javascript">
(function(l) {
if (!l){window.lintrk = function(a,b){window.lintrk.q.push([a,b])};
window.lintrk.q=[]}
var s = document.getElementsByTagName("script")[0];
var b = document.createElement("script");
b.type = "text/javascript";b.async = true;
b.src = "https://snap.licdn.com/li.lms-analytics/insight.min.js";
s.parentNode.insertBefore(b, s);})(window.lintrk);
</script>
<noscript>
<img height="1" width="1" style="display:none;" alt="" src="https://px.ads.linkedin.com/collect/?pid=YOUR_PARTNER_ID_HERE&fmt=gif" />
</noscript>
```

Replace **both** instances of `YOUR_PARTNER_ID_HERE` with the actual Partner ID before publishing.

**GTM is preferred over the raw JS** because future tracking changes can be made without touching the site header again.

---

## While you're in GTM: housekeeping items found in the audit

Two related cleanups worth doing in the same session:

1. **Remove the legacy Universal Analytics tag** (`UA-7870337-1`). Universal Analytics has been deprecated since July 2023 and is firing into a sunset property. Cleaner GTM container, no behavior change.
2. **Confirm GA4 is configured with the right conversion events** (membership signup, event registration, newsletter subscribe). If those aren't set up as conversions in GA4, the dashboard data going to the board is incomplete.

Both are 5-minute checks. Worth bundling into the same GTM session.
