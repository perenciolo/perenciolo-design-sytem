/// <reference types="@jest/globals" />
/// <reference types="'@jest/types'" />

import { Global } from "@jest/globals";

export interface ICustomGlobal extends Global {
  mockFormatMessage: (formatMessageFn: jest.Mock) => any;
  mockUseStyles: (useStylesFn: jest.Mock, classesArray: Array<string>) => void;
  mockFormatDate: (formatDateFn: jest.Mock) => any;
}

export declare const IMockFormatMessage: ICustomGlobal['mockFormatMessage'];
export declare const IMockUseStyles: ICustomGlobal['mockUseStyles'];
