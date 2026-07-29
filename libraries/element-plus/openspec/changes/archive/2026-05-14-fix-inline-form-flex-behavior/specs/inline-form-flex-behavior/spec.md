## Requirements

### Requirement: Inline form items expand to preferred widths when space allows

When the form uses inline layout with left or right label positions (scope covered by this library’s styles), each `.el-form-item` SHALL occupy horizontal space up to the documented preferred label and content widths **WHEN** the flex row has remaining free space after placing items at their preferred sizes.

#### Scenario: Wide container shows preferred control width

- **WHEN** an inline form row has enough width for multiple fields at their preferred dimensions
- **THEN** control regions SHALL render at the documented preferred content width (token default 240px) rather than staying at the minimum content width only

#### Scenario: Narrow container still respects minimums and wrap

- **WHEN** the form container narrows below the sum of preferred widths for items on a row
- **THEN** fields SHALL shrink toward documented minimum widths before wrapping per existing wrap rules

### Requirement: Flex growth targets the content region

The system SHALL apply flexible growth along the main axis primarily through the `.el-form-item__content` region (not by arbitrarily stretching radio/checkbox groups excluded from full-width rules), so preferred widths remain predictable.

#### Scenario: Label width stable while content absorbs slack

- **WHEN** extra horizontal slack exists inside an inline form item
- **THEN** the solution SHOULD expand the content region toward the preferred content width before affecting excluded non-filled controls
