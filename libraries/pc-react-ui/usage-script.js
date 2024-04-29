/* eslint-disable */
const fs = require('fs');
const usage = require('./ideusage.json');
const naslui = require('./dist-theme/nasl.ui.json');

function mergeIdeUsage(a, b) {
  a.ideusage = b.ideusage;
}

function mergeSlots(a, b) {
  if (b.slots) {
    b.slots.forEach((slot) => {
      const _target = a.slots.find((_slot) => (_slot.name = slot.name));
      if (_target) {
        Object.assign(_target, slot);
      } else if (slot.name === 'default') {
        a.slots.push(slot);
      }
    });
  }
}

function mergeBlock(a, b) {
  if (b.blocks) {
    a.blocks = b.blocks;
  }
}

function merge(list) {
  list.forEach((obj) => {
    const n = obj.name;
    const _usage = usage.find((u) => u.name === n);
    if (_usage) {
      mergeIdeUsage(obj, _usage);
      mergeSlots(obj, _usage);
      mergeBlock(obj, _usage);
    }
    if (obj.children && obj.children.length > 0) {
      merge(obj.children);
    }
  });
}

merge(naslui);
console.log(JSON.stringify(naslui, null, ' '));
