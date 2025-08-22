import * as parser from '@babel/parser';
import traverse from '@babel/traverse';
import glob from 'fast-glob';
import fs from 'fs-extra';
import { genNaslLogics } from '../../shared';

export default genNaslLogics;
