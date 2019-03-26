import * as ts from "typescript";
import * as fs from "fs";
import * as path from "path";
import transformer from "./";

const fixturePath = path.join(__dirname, "__fixtures");

describe("transformer", () => {
  describe("should compile and match snap", () => {
    fs.readdirSync(fixturePath)
      .map((fileName) => ({name: fileName, abs: path.resolve(path.join(fixturePath, fileName))}))
      .forEach((inputFile) =>
        test(`For Fixture: ${inputFile.name}`, () => {
          const result = transform(fs.readFileSync(inputFile.abs).toString());
          expect(result).toMatchSnapshot();
        }));
  });
});

function transform(sourceText: string) {
  const source = ts.createSourceFile(
    "temp.ts",
    sourceText,
    ts.ScriptTarget.ESNext
  );
  const result = ts.transform<ts.SourceFile>(source, [transformer()], {});
  const printer = ts.createPrinter();
  return printer.printNode(
    ts.EmitHint.Unspecified,
    result.transformed[0],
    ts.createSourceFile("result.ts", "", ts.ScriptTarget.ESNext)
  );
}
