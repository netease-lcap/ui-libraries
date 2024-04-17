/// <reference types="@nasl/types" />

namespace nasl.ui {
  export class BaseEvent {}
  export class ValidateResult {
    rawValue: nasl.core.String;
    value: nasl.core.String;
    trigger: nasl.core.String;
    muted: nasl.core.String;
    valid: nasl.core.Boolean;
    touched: nasl.core.Boolean;
    dirty: nasl.core.Boolean;
    firstError: nasl.core.String;
  }
}
