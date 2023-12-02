declare module "@ua-parser-js/pro-business" {
  // Type definitions for UAParser.js v2.0.0-beta.1
  // Project: https://github.com/faisalman/ua-parser-js
  // Definitions by: Faisal Salman <https://github.com/faisalman>

  declare namespace UAParser {
    interface IData<T> {
      is(val: string): boolean;
      toString(): string;
      withClientHints(): PromiseLike<T> | T;
      withFeatureCheck(): T;
    }

    interface IBrowser extends IData<IBrowser> {
      major?: string;
      name?: string;
      version?: string;
    }

    interface ICPU extends IData<ICPU> {
      architecture?:
        | "68k"
        | "amd64"
        | "arm"
        | "arm64"
        | "armhf"
        | "avr"
        | "ia32"
        | "ia64"
        | "irix"
        | "irix64"
        | "mips"
        | "mips64"
        | "ppc"
        | "sparc"
        | "sparc64";
    }

    interface IDevice extends IData<IDevice> {
      model?: string;
      type?: "console" | "mobile" | "smarttv" | "tablet" | "wearable";
      vendor?: string;
    }

    interface IEngine extends IData<IEngine> {
      name?:
        | "Amaya"
        | "Blink"
        | "EdgeHTML"
        | "Flow"
        | "Gecko"
        | "Goanna"
        | "KHTML"
        | "LibWeb"
        | "Links"
        | "Lynx"
        | "NetFront"
        | "NetSurf"
        | "Presto"
        | "Tasman"
        | "Trident"
        | "WebKit"
        | "iCab"
        | "w3m";
      version?: string;
    }

    interface IOS extends IData<IOS> {
      name?: string;
      version?: string;
    }

    interface IResult extends IData<IResult> {
      browser: IBrowser;
      cpu: ICPU;
      device: IDevice;
      engine: IEngine;
      os: IOS;
      ua: string;
    }

    type RegexMap = ((Function | RegExp | string)[] | RegExp | string)[][];

    export function UAParser(
      uastring?: string,
      extensions?: Record<string, RegexMap>,
      headers?: Record<string, string>,
    ): IResult;
    export function UAParser(
      uastring?: string,
      headers?: Record<string, string>,
    ): IResult;
    export function UAParser(
      extensions?: Record<string, RegexMap>,
      headers?: Record<string, string>,
    ): IResult;
    export function UAParser(headers?: Record<string, string>): IResult;

    export class UAParser {
      static readonly BROWSER: {
        MAJOR: "major";
        NAME: "name";
        VERSION: "version";
      };
      static readonly CPU: {
        ARCHITECTURE: "architecture";
      };
      static readonly DEVICE: {
        CONSOLE: "console";
        EMBEDDED: "embedded";
        MOBILE: "mobile";
        MODEL: "model";
        SMARTTV: "smarttv";
        TABLET: "tablet";
        TYPE: "type";
        VENDOR: "vendor";
        WEARABLE: "wearable";
      };
      static readonly ENGINE: {
        NAME: "name";
        VERSION: "version";
      };
      static readonly OS: {
        NAME: "name";
        VERSION: "version";
      };
      static readonly VERSION: string;

      constructor(
        uastring?: string,
        extensions?: Record<string, RegexMap>,
        headers?: Record<string, string>,
      );
      constructor(uastring?: string, headers?: Record<string, string>);
      constructor(
        extensions?: Record<string, RegexMap>,
        headers?: Record<string, string>,
      );
      constructor(headers?: Record<string, string>);

      getBrowser(): IBrowser;
      getCPU(): ICPU;
      getDevice(): IDevice;
      getEngine(): IEngine;
      getOS(): IOS;
      getResult(): IResult;
      getUA(): string;
      setUA(uastring: string): UAParser;
    }
  }

  export as namespace UAParser;
  export = UAParser;
}
