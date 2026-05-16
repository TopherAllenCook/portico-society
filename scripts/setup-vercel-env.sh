#!/usr/bin/env bash
#
# One-shot Vercel env setup for the Verve MD audit pipeline.
#
# Usage:   ./scripts/setup-vercel-env.sh
# Requires: a Vercel-linked project in this directory, and `vercel` CLI
#           (we use `npx vercel` so no global install needed).
#
# What it does:
#   - Prompts for the keys it needs (secrets via -s so they don't echo).
#   - Pulls FIRECRAWL_API_KEY from your shell if already exported.
#   - Generates a fresh AUDIT_RUN_TOKEN with openssl.
#   - Writes each var to Vercel for production, preview, and development.
#
# Nothing is logged to disk. The script ends with the values gone from RAM.
#
set -euo pipefail

if [ -z "${FIRECRAWL_API_KEY:-}" ]; then
  echo "Note: FIRECRAWL_API_KEY isn't in your shell env. We'll prompt for it." >&2
  read -s -p "FIRECRAWL_API_KEY: " FIRECRAWL_API_KEY
  echo
fi

read -s -p "ANTHROPIC_API_KEY: " ANTHROPIC_API_KEY; echo
read -s -p "RESEND_API_KEY: " RESEND_API_KEY; echo
read    -p "NEXT_PUBLIC_SUPABASE_URL (e.g. https://abc.supabase.co): " NEXT_PUBLIC_SUPABASE_URL
read -s -p "SUPABASE_SERVICE_ROLE_KEY (service_role, NOT anon): " SUPABASE_SERVICE_ROLE_KEY; echo

AUDIT_RUN_TOKEN=$(openssl rand -hex 32)
echo "Generated AUDIT_RUN_TOKEN."

push_var () {
  local name="$1"
  local value="$2"
  for env in production preview development; do
    # Remove any pre-existing value so the add doesn't fail with "already exists"
    npx --yes vercel env rm "$name" "$env" --yes >/dev/null 2>&1 || true
    printf '%s' "$value" | npx --yes vercel env add "$name" "$env" >/dev/null
    echo "  $name -> $env"
  done
}

echo
echo "Pushing to Vercel..."
push_var ANTHROPIC_API_KEY        "$ANTHROPIC_API_KEY"
push_var RESEND_API_KEY           "$RESEND_API_KEY"
push_var FIRECRAWL_API_KEY        "$FIRECRAWL_API_KEY"
push_var NEXT_PUBLIC_SUPABASE_URL "$NEXT_PUBLIC_SUPABASE_URL"
push_var SUPABASE_SERVICE_ROLE_KEY "$SUPABASE_SERVICE_ROLE_KEY"
push_var AUDIT_RUN_TOKEN          "$AUDIT_RUN_TOKEN"

unset ANTHROPIC_API_KEY RESEND_API_KEY SUPABASE_SERVICE_ROLE_KEY AUDIT_RUN_TOKEN
echo
echo "Done. Run \`npx vercel env ls\` to confirm."
