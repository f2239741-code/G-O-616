# Security Policy

## Supported Versions

| Version | Supported          |
| ------- | ------------------ |
| 1.0.x   | :white_check_mark: |

## Reporting a Vulnerability

The Guardian Oracle team takes the security of our sovereign systems, zero-knowledge integrity circuits, and user privacy seriously.

If you believe you have discovered a security vulnerability or sensitive information exposure:

1. **Do not disclose the issue publicly** or open public GitHub issues detailing the vulnerability.
2. Please report findings directly to the repository maintainers or via GitHub's Private Vulnerability Reporting feature.
3. Provide detailed steps to reproduce the vulnerability, including:
   - Specific endpoints or components involved
   - Payload or proof-of-concept
   - Impact assessment on user integrity or data privacy

We will acknowledge receipt within 48 hours and work with you to resolve the issue responsibly.

## Best Practices for Contributors and Forkers

- **Never commit `.env` or `.env.local` files**: Always use `.env.example` as a template and keep secrets in your local environment.
- **Never hardcode private keys**: Any Web3 wallets or API credentials should be injected via environment variables or handled client-side through standard Web3 providers (e.g. MetaMask, WalletConnect).
- **Audit dependencies**: Periodically run `npm audit` to detect and remediate upstream package vulnerabilities.
