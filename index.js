#!/usr/bin/env node
const os = require("os")
const { lookup } = require("dns")
const { stdout } = require("process")
const Colors = {
    BOLD: "\u001b[1m",
    BLUE: "\u001b[34;1m",
    RESET: "\u001b[0m"
}
lookup("www.google.com", (err) => {
    let status;
    if (err && err.code === "ENOTFOUND") {
        status = "Offline"
    } else status = "Online"
    let platform;
    if (os.platform() === "win32") platform = "Windows"
    else if (os.platform() === "linux") platform = "Linux"
    else if (os.platform() === "sunos") platform = "SunOS"
    else if (os.platform() === "aix") platform = "AIX"
    else if (os.platform() === "cygwin") platform = "Cygwin"
    else if (os.platform() === "darwin") platform = "Darwin"
    else if (os.platform() === "freebsd") platform = "FreeBSD"
    else if (os.platform() === "android") platform = "Android"
    else if (os.platform() === "netbsd") platform = "NetBSD"
    else if (os.platform() === "openbsd") platform = "OpenBSD"
    else platform = "Unknown"
    let time = os.uptime()
    let day = Math.floor(time / (24 * 3600))
    time = (time % (24 * 3600))
    let hour = Math.floor(time / 3600)
    time = time % 3600
    let min = Math.floor(time / 60)
    let total = Math.floor(os.totalmem() / 1024 / 1024)
    let res = `${day >= 1 ? `${day} day` : ""}${day >= 2 ? "s," : ""} ${hour >= 1 ? `${hour} hour` : ""}${hour >= 2 ? "s," : ""} ${min >= 1 ? `${min} minute` : ""}${min >= 2 ? "s" : ""}`
    stdout.write(`${Colors.BLUE + Colors.BOLD + os.userInfo().username + Colors.RESET}@${Colors.BLUE + Colors.BOLD + os.hostname + Colors.RESET}
${Colors.BLUE}OS:${Colors.RESET}        ${platform}
${Colors.BLUE}OS ARCH:${Colors.RESET}   ${os.arch()}
${Colors.BLUE}UPTIME:${Colors.RESET}    ${res}
${Colors.BLUE}RAM:${Colors.RESET}       ${total.toString().length >= 10000 ? total.toString().length <= 1000 ? `${total.toString().slice(0, 1)}.${total.toString().slice(1, 2)}` : total.toString() : total.toString().slice(0, 2)} ${total.toString().length <= 1000 ? "GB" : "MB"}
${Colors.BLUE}WIFI:${Colors.RESET}      ${status}
`)
})