# Sail working thesis (unvalidated)

A managed AI-channel integration and transaction experience layer for businesses with existing customer-facing services, helping them make authorized customer journeys available through compatible AI assistants without separately building every channel implementation.

Possible initial industry: booking/reservation SaaS. Example journeys: booking, modifying and cancelling reservations. Vertical choice is a hypothesis, not decided product strategy.

## Questions to resolve
- Who signs and pays: the vertical SaaS provider or its merchant?
- Why buy instead of using MCP Apps, OpenUI/Thesys, existing agent gateways, API wrappers or internal teams?
- What is ongoing operational value beyond a one-time integration?
- How will users discover or intentionally invoke a business integration inside external AI hosts?
- What exactly is supported by each host? Who approves listing and permitted transaction types?
- How are authentication, authorization, inventory, payment, idempotency, rollback, compliance and reconciliation handled?
- Is a deterministic transactional API better than an LLM business agent for common operations?
- What can be sold before large-scale AI-channel traffic exists?

No implemented host connections or live merchant integrations are claimed. Public research only; no Salesforce confidential information. Obtain employer clearance before commercial development.