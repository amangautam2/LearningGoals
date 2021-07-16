"use strict";

const os = require("os");

const getClientInfo = () => {
	return {
		type: "nodejs",
		langVersion: process.version
	};
};

const getCpuInfo = () => {
	const cpus = os.cpus();
	const load = os.loadavg();
	const cpu = {
		load1: load[0],
		load5: load[1],
		load15: load[2],
		cores: Array.isArray(cpus) ? os.cpus().length : null,
	};
	cpu.utilization = Math.min(Math.floor(load[0] * 100 / cpu.cores), 100);

	return cpu;
};

const getMemoryInfo = () => {
	const mem = {
		free: os.freemem(),
		total: os.totalmem()
	};
	mem.percent = (mem.free * 100 / mem.total);

	return mem;
};

const getUserInfo = () => {
	try {
		return os.userInfo();
	} catch (e) {
		return {};
	}
};

const getOsInfo = () => {
	return {
		uptime: os.uptime(),
		type: os.type(),
		release: os.release(),
		hostname: os.hostname(),
		arch: os.arch(),
		platform: os.platform(),
		user: getUserInfo()
	};
};

const getProcessInfo = () => {
	return {
		pid: process.pid,
		memory: process.memoryUsage(),
		uptime: process.uptime(),
		argv: process.argv
	};
};

const getDateTimeInfo = () => {
	return {
		now: Date.now(),
		iso: new Date().toISOString(),
		utc: new Date().toUTCString()
	};
};

const getHealthStatus = (/*broker*/) => {
	return {
		cpu: getCpuInfo(),
		mem: getMemoryInfo(),
		os: getOsInfo(),
		process: getProcessInfo(),
		client: getClientInfo(),
		time: getDateTimeInfo()
	};
};

module.exports = {
	getHealthStatus,
	getCpuInfo,
	getMemoryInfo,
	getOsInfo,
	getProcessInfo,
	getClientInfo,
	getDateTimeInfo
};