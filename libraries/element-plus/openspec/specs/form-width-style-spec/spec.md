## Requirements

### Requirement: Form root exposes width tokens

The system SHALL define CSS custom properties for default label width, default content/control area width, and SHALL document their relationship to legacy names such as `--el-form-inline-content-width` (inline content width SHALL NOT use an undocumented lower default such as 220px when block content uses 240px unless explicitly documented as deprecated alias migration).

#### Scenario: Theme reads consistent defaults

- **WHEN** a consumer inspects the default form styles without local overrides
- **THEN** label preferred width, content preferred width, and documented minimum widths SHALL map to named tokens and default values

#### Scenario: Overrides cascade predictably

- **WHEN** a consumer sets width tokens on `.el-form` or theme-level variables
- **THEN** nested form items and typical controls filling the content area SHALL respect the overridden widths according to documented precedence

### Requirement: Content width aligns with input width defaults

The system SHALL ensure the default form item content width and the default `--el-input-width` (and equivalent textarea/select/date-editor width variables in this library) align to the same token-derived preferred value unless explicitly documented as intentionally different.

#### Scenario: Form row visual consistency

- **WHEN** a block-layout form renders a default-width text input inside a standard form item content region
- **THEN** the rendered control width SHALL match the content region width within normal box model expectations

### Requirement: Inline and block share preferred and minimum widths

For left/right label positions, the system SHALL use the same documented preferred widths for label and content regions in **inline** layout as in **block** layout, and the same documented minimum widths for shrink behavior.

#### Scenario: Inline matches block targets

- **WHEN** comparing an inline form item and a block form item with no custom widths
- **THEN** both SHALL use the same token-derived preferred label width and preferred content width

### Requirement: Inline layout shrinks before wrapping

For `.el-form--inline` (with label positions covered by this spec), the system SHALL lay out form items such that **within a row**, items MAY shrink toward their documented minimum widths first; **WHEN** a row cannot fit items at their minimum widths, items SHALL wrap to the next row.

#### Scenario: Narrowing container

- **WHEN** the form container becomes narrower while remaining wide enough for one item at minimum width
- **THEN** items SHALL shrink toward minimum widths before wrapping where flex layout allows

### Requirement: Content-area fill uses an explicit whitelist

Inside `.el-form-item__content`, the system SHALL apply full-width stretching (`width` / `max-width` as specified in implementation docs) only to documented control root selectors (whitelist). Radio groups, checkbox groups, and similarly intentional non-filled controls SHALL NOT be forced to full width by a blanket `> *` rule.

#### Scenario: Select fills content

- **WHEN** a whitelisted select control is the direct child of content in a sized form item
- **THEN** it SHALL span the content region width per documented rules

### Requirement: Documentation for authors

The system SHALL document token names, default pixel values, block vs inline behavior, whitelist rationale, override locations (form root vs theme), and any **BREAKING** visual change relative to prior releases.

#### Scenario: Implementer follows the spec

- **WHEN** an implementer reads the change artifacts and component stories
- **THEN** they MUST be able to configure form widths and predict inline wrap/shrink behavior without relying solely on scattered LESS/CSS sources
