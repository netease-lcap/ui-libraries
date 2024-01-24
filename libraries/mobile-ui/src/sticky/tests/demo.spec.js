import {
  describe,
  it,
  test,
  vi as jest,
  expect,
} from 'vitest';
  import Demo from '../demos';
import { snapshotDemo } from '../../../test/demo';

snapshotDemo(Demo);
