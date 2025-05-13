/// <reference types="vite/client" />

declare module 'jspdf' {
  export default class jsPDF {
    constructor(options?: any);
    addImage(data: any, format: string, x: number, y: number, width: number, height: number): any;
    addPage(): any;
    save(filename: string): void;
  }
}

declare module 'html2canvas' {
  export default function html2canvas(element: HTMLElement, options?: any): Promise<HTMLCanvasElement>;
}

declare module 'file-saver' {
  export function saveAs(data: Blob, filename: string): void;
}

declare module 'docx' {
  export class Document {
    constructor(options: any);
  }
  export class Paragraph {
    constructor(options: any);
  }
  export class TextRun {
    constructor(options: any);
  }
  export enum HeadingLevel {
    HEADING_1 = 'Heading1',
    HEADING_2 = 'Heading2',
    HEADING_3 = 'Heading3',
  }
  export class Table {
    constructor(options: any);
  }
  export class TableRow {
    constructor(options: any);
  }
  export class TableCell {
    constructor(options: any);
  }
  export enum BorderStyle {
    SINGLE = 'single',
  }
  export namespace Packer {
    export function toBuffer(doc: Document): Promise<Buffer>;
  }
}
