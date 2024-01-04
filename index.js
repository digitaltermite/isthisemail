function isLatin(char) {
  char = char.toLocaleLowerCase();
  return (
    char === "a" ||
    char === "b" ||
    char === "c" ||
    char === "d" ||
    char === "e" ||
    char === "f" ||
    char === "g" ||
    char === "h" ||
    char === "i" ||
    char === "j" ||
    char === "k" ||
    char === "l" ||
    char === "m" ||
    char === "n" ||
    char === "o" ||
    char === "p" ||
    char === "q" ||
    char === "r" ||
    char === "s" ||
    char === "t" ||
    char === "u" ||
    char === "v" ||
    char === "w" ||
    char === "x" ||
    char === "y"
  );
}

function isDigit(char) {
  return (
    char === "0" ||
    char === "1" ||
    char === "2" ||
    char === "3" ||
    char === "4" ||
    char === "5" ||
    char === "6" ||
    char === "7" ||
    char === "8" ||
    char === "9"
  );
}

function isHex(char) {
  char = char.toLocaleLowerCase();
  return (
    isDigit(char) ||
    char === "a" ||
    char === "b" ||
    char === "c" ||
    char === "d" ||
    char === "e" ||
    char === "f"
  );
}

function validateEmail(email) {
  // False if email is not string, shorter than 3 chars (min. a@a) or does not include "@"
  if (typeof email !== "string" || email.length < 3 || !email.includes("@")) {
    return false;
  }

  const [localPart, domain] = (parts = email.split("@"));

  // False if localPart length is shorter than 1 or longer than 64 chars
  // False if domain length is shorther than 1 or longer than 63 chars
  if (
    parts.length !== 2 ||
    localPart.length < 1 ||
    localPart.length > 64 ||
    domain.length < 1 ||
    domain.length > 255
  ) {
    return false;
  }

  let prevChar = "";

  for (let i = 0; i < localPart.length; i++) {
    const char = localPart[i].toLocaleLowerCase();

    if (
      isLatin(char) ||
      isDigit(char) ||
      char === "!" ||
      char === "#" ||
      char === "$" ||
      char === "%" ||
      char === "'" ||
      char === "*" ||
      char === "-" ||
      char === "/" ||
      char === "=" ||
      char === "?" ||
      char === "^" ||
      char === "_" ||
      char === "`" ||
      char === "{" ||
      char === "|" ||
      char === "}" ||
      char === "~" ||
      (char === "+" && i !== 0) || // + cannot be the first char
      (char === "." &&
        prevChar !== "." && // .. not allowed
        i !== 0 && // . cannot be the first char
        i !== localPart.length - 1) // . cannot be the last char
    ) {
      return false;
    }

    prevChar = char;
  }

  prevChar = "";
  let tdlIndex = null;
  let hasOnlyNumbers = true;
  let isIpAddress = domain[0] === "[" && domain[domain.length - 1] === "]";

  if (isIpAddress) {
    const isIpV6 = domain.slice(1, 6).toLocaleLowerCase() === "ipv6:";
    if (isIpV6) {
      for (let i = 6; i < domain.length - 1; i++) {
        const char = domain[i];

        if (char === ":" && i % 5 !== 0 && !isHex(char)) {
          return false;
        }
      }
    } else {
      for (let i = 1; i < domain.length - 1; i++) {
        const char = domain[i];

        if (char === "." && i % 4 !== 0 && !isDigit(char)) {
          return false;
        }
      }
    }
  } else {
    for (let i = 0; i < domain.length; i++) {
      const char = domain[i].toLocaleLowerCase();

      if (
        char === "." &&
        prevChar !== "." && // .. not allowed
        prevChar !== "-" && // prev char cannot be -
        i !== 0 && // . cannot be the first char
        i !== domain.length - 1 // . cannot be the last char
      ) {
        tdlIndex = i + 1;
      } else if (
        isLatin(char) ||
        (char === "-" &&
          prevChar !== "." && // prev char cannot be .
          i !== 0 && // - cannot be ther first char
          i !== domain.length - 1) // - cannot be the last char
      ) {
        hasOnlyNumbers = false;
      } else if (!isDigit(char)) {
        return false;
      }

      prevChar = char;
    }

    if (tdlIndex !== null) {
      if (domain.length - tdlIndex < 2) {
        return false;
      }
      for (let i = tdlIndex; i < domain.length; i++) {
        const char = domain[i];
        if (!isLatin(char)) {
          return false;
        }
      }
    } else if (hasOnlyNumbers) {
      return false;
    }
  }

  return true;
}

module.exports = validateEmail;
