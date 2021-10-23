import { hi } from "index"

describe("initiate package", () => {
  it("should successfully run the package", async () => {
    expect(hi()).toEqual("gopay")
  })
})