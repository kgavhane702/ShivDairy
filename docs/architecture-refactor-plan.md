# Architecture Refactor Plan

## Goals
- Make the app resilient for future growth beyond vegetables and dairy into eggs, livestock, and other agri-commerce categories.
- Separate UI, domain concepts, and data sources so the app can evolve without fragile screen-level logic.
- Keep the existing experience intact while improving maintainability.

## Architectural decisions
1. Domain-first model
   - Introduce shared domain types for products, categories, cart items, coupons, and cart summaries.
   - Keep business concepts independent from screen components.

2. Feature-based organization
   - Group related UI and state into feature folders such as cart, catalog, and checkout.
   - Avoid mixing data, navigation, and presentation inside one screen component.

3. Centralized catalog and cart state
   - Move hard-coded product and category lists into a dedicated data layer.
   - Let the cart behave as a shared app state instead of each screen maintaining its own local list.

4. Data-driven screens
   - Render home, category, and cart views from shared data sources so adding a new product family requires less UI duplication.

5. Future-ready taxonomy
   - Support a broader category model that can cover live animals, eggs, dairy, vegetables, grains, and more without special-case branching.

## Proposed folder structure
- src/domain: core business models and contracts
- src/data: catalog, coupons, and other shared content
- src/features: feature-specific UI and state (cart, catalog, checkout)
- src/components: reusable presentational primitives only
- src/app: route-level screens and navigation entry points

## Implementation phases
### Phase 1 - Foundation
- Add typed domain models.
- Introduce centralized catalog data.
- Create a shared cart context.

### Phase 2 - Screen refactor
- Replace inline products and categories with shared data.
- Move cart calculations into the shared cart layer.
- Keep the UI visually consistent while using the new state flow.

### Phase 3 - Expansion readiness
- Add repository or service layer for remote APIs.
- Introduce checkout and order state modules.
- Prepare the product model for livestock-specific fields such as breed, age, or weight.

## Guardrails
- Preserve current design language and navigation flow.
- Favor small, composable changes over large rewrites.
- Keep new abstractions reusable for future verticals.
