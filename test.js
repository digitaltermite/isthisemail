const itThisEmail = require("./index");

function test(email) {
  const result = itThisEmail(email);
  console.log(`${result ? "Passed:\t\t" : "Not passed:\t"} ${email}`);
}

console.log("\n# Shell pass");
test("simple@example.com");
test("very.common@example.com");
test("x@example.com");
test("long.email-address-with-hyphens@and.subdomains.example.com");
test("user.name+tag+sorting@example.com");
test("name/surname@example.com");
test("admin@example");
test("example@s.example");
test("mailhost!username@example.org");
test("user%example.com@example.org");
test("user-@example.org");
test("postmaster@[123.123.123.123]");
test("postmaster@[IPv6:2001:0db8:85a3:0000:0000:8a2e:0370:7334]");
test("_test@[IPv6:2001:0db8:85a3:0000:0000:8a2e:0370:7334]");

console.log("\n# Shell not pass");
test("I❤️CHOCOLATE🍫@example.com");
test("abc.example.com");
test("a@b@c@example.com");
test(`a"b(c)d,e:f;g<h>i[j\k]l@example.com`);
test(`just"not"right@example.com`);
test(`this is"not\allowed@example.com`);
test(`this\ still\"not\\allowed@example.com`);
test(
  "1234567890123456789012345678901234567890123456789012345678901234+x@example.com"
);
test("i.like.underscores@but_they_are_not_allowed_in_this_part");
test("a@123");
