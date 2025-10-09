import ContactController from "../controllers/ContactController.js";
import Contact from "../models/Contact.js";

describe("ContactController", () => {
  let req, res;

  beforeEach(() => {
    req = {
      userId: "507f1f77bcf86cd799439011",
      params: { id: "507f1f77bcf86cd799439022" },
      body: {},
    };
    res = { status: jest.fn().mockReturnThis(), json: jest.fn() };
  });

  it("getAllContacts - should return contacts", async () => {
    jest.spyOn(Contact, "find").mockResolvedValueOnce([{ firstName: "John" }]);
    await new ContactController().getAllContacts(req, res);
    expect(res.json).toHaveBeenCalledWith([{ firstName: "John" }]);
  });

  it("getContactById - should return contact by ID", async () => {
    jest.spyOn(Contact, "findOne").mockResolvedValueOnce({ firstName: "John" });
    await new ContactController().getContactById(req, res);
    expect(res.json).toHaveBeenCalledWith({ firstName: "John" });
  });

  it("getContactById - should return 404 if not found", async () => {
    jest.spyOn(Contact, "findOne").mockResolvedValueOnce(null);
    await new ContactController().getContactById(req, res);
    expect(res.status).toHaveBeenCalledWith(404);
  });

  it("createContact - should return 201 if created", async () => {
    req.body = { firstname: "Jane", lastname: "Doe", phone: "0601020304" };
    jest.spyOn(Contact.prototype, "save").mockResolvedValueOnce();
    await new ContactController().createContact(req, res);
    expect(res.status).toHaveBeenCalledWith(201);
  });

  it("updateContact - should return 200 if updated", async () => {
    req.body = { firstName: "Jane", lastName: "Doe", phone: "0601020305" };
    jest
      .spyOn(Contact, "findOneAndUpdate")
      .mockResolvedValueOnce({ firstName: "Jane" });
    await new ContactController().updateContact(req, res);
    expect(res.status).toHaveBeenCalledWith(203);
  });

  it("deleteContact - should return 200 if deleted", async () => {
    jest.spyOn(Contact, "findOneAndDelete").mockResolvedValueOnce({});
    await new ContactController().deleteContact(req, res);
    expect(res.status).toHaveBeenCalledWith(200);
  });
});
