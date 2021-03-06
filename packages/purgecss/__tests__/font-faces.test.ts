import PurgeCSS from "./../src/index";

const root = "./packages/purgecss/__tests__/test_examples/";

describe("purge unused font-face", () => {
  let purgedCSS: string;
  beforeAll(async done => {
    const resultPurge = await new PurgeCSS().purge({
      content: [`${root}font_face/font_face.html`],
      css: [`${root}font_face/font_face.css`],
      fontFace: true
    });
    purgedCSS = resultPurge[0].css;
    done();
  });
  it("keep @font-face 'Cerebri Bold'", () => {
    expect(
      purgedCSS.includes(`src: url('../fonts/CerebriSans-Bold.eot?')`)
    ).toBe(true);
  });
  it("keep @font-face 'Cerebri Sans'", () => {
    expect(
      purgedCSS.includes(`src: url('../fonts/CerebriSans-Regular.eot?')`)
    ).toBe(true);
  });
  it("remove @font-face 'OtherFont'", () => {
    expect(purgedCSS.includes(`src: url('xxx')`)).toBe(false);
  });
});
