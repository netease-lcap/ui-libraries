import { describe, expect, it, vi, beforeEach } from 'vitest';
import { Map as imMap } from 'immutable';
import { sleep } from '@ep-test/test-utils';
import { $deletePropsList, $dataSourceDeleteField } from '@/plugins/constants';
import { fiberNode } from '@/plugins/hooks';
import '@/utils/index';
import AnchorAccumulate from '../plugins/basic-plugins';

vi.mock('@/components/el-anchor/index', () => ({
  ElAnchorLink: vi.fn((props) => ({
    type: 'ElAnchorLink',
    props,
    children: props.children || [],
  })),
}));

describe('basic-plugins.tsx', () => {
  beforeEach(() => {
    // 重置所有 mock
    vi.clearAllMocks();
  });
  
});
