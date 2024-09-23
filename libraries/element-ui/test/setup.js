import 'vitest-canvas-mock';
import { expect } from 'vitest';
import vueSnapshotSerializer from 'jest-serializer-vue-tjw';

expect.addSnapshotSerializer(vueSnapshotSerializer);
