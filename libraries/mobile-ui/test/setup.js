import 'vitest-canvas-mock';
import Vue from 'vue';
import { expect } from 'vitest';
import vueSnapshotSerializer from 'jest-serializer-vue';
import '__demo-entry__';

expect.addSnapshotSerializer(vueSnapshotSerializer);
