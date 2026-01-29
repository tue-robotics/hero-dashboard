/*
  Slightly modified from:

  Reasonably Secure Electron
  Copyright (C) 2019  Bishop Fox
  This program is free software; you can redistribute it and/or
  modify it under the terms of the GNU General Public License
  as published by the Free Software Foundation; either version 2
  of the License, or (at your option) any later version.
  This program is distributed in the hope that it will be useful,
  but WITHOUT ANY WARRANTY; without even the implied warranty of
  MERCHANTABILITY or FITNESS FOR A PARTICULAR PURPOSE.  See the
  GNU General Public License for more details.
  You should have received a copy of the GNU General Public License
  along with this program; if not, write to the Free Software
  Foundation, Inc., 51 Franklin Street, Fifth Floor, Boston, MA  02110-1301, USA.
-------------------------------------------------------------------------
Implementing a custom protocol achieves two goals:
  1) Allows us to use ES6 modules/targets for Angular
  2) Avoids running the app in a file:// origin
*/

import { protocol } from "electron";
import * as fs from "fs";
import * as path from "path";
import { URL } from "url";

const mimeTypes = {
  ".js": "text/javascript",
  ".mjs": "text/javascript",
  ".html": "text/html",
  ".htm": "text/html",
  ".json": "application/json",
  ".css": "text/css",
  ".svg": "application/svg+xml",
  ".ico": "image/vnd.microsoft.icon",
  ".png": "image/png",
  ".jpg": "image/jpeg",
  ".map": "text/plain",
};

function charset(mimeType: string | null) {
  return [".html", ".htm", ".js", ".mjs"].some((m) => m === mimeType) ? "utf-8" : null;
}

function mime(filename: string) {
  const type = mimeTypes[path.extname(`${filename || ""}`).toLowerCase()];
  return type || null;
}

export default (scheme: string, customProtocol?: typeof protocol) => {
  (customProtocol || protocol).handle(scheme, async (request) => {
    const reqUrl = new URL(request.url);

    if (!reqUrl.pathname.startsWith("/")) {
      return new Response(null, { status: 400 });
    }

    let reqPath = path.normalize(reqUrl.pathname);
    if (reqPath === "/") {
      reqPath = "/index.html";
    }

    const reqFilename = path.basename(reqPath);
    const filePath = path.join(__dirname, reqPath);

    try {
      const data = await fs.promises.readFile(filePath);
      const mimeType = mime(reqFilename);
      if (mimeType !== null) {
        const headers: Record<string, string> = {
          "Content-Type": mimeType + (charset(mimeType) ? "; charset=utf-8" : ""),
        };
        return new Response(data, { status: 200, headers });
      }
      return new Response(null, { status: 415 });
    } catch (err) {
      console.error(err);
      return new Response(null, { status: 404 });
    }
  });
};
