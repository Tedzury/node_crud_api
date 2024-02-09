class LoadBalancer {
	_masterServerPort: number;
	_maxPorts: number;
	_currPort: number;

	constructor(defPort: number, maxPorts: number) {
		this._masterServerPort = defPort;
		this._maxPorts = this._masterServerPort + maxPorts;
		this._currPort =  this._masterServerPort + 1;
	};
	getCurrServer() {
		return this._currPort as number;
	};
	setNextServer() {
		if (this._currPort + 1 >= this._maxPorts) {
			this._currPort = this._masterServerPort + 1;
		} else {
			this._currPort++
		}
	};
};

export default LoadBalancer;
