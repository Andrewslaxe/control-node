
class CreationError extends Error {
	constructor(componentName: string) {
		super('Failed to create ' + componentName);
		this.name = `${componentName}CreationError`;
	}
}

class UpdateError extends Error {
	constructor(componentName: string) {
		super('Failed to update ' + componentName);
		this.name = `${componentName}UpdateError`;
	}
}

class GetAllError extends Error {
	constructor(componentName: string) {
		super('Failed to get all ' + componentName);
		this.name = `${componentName}GetAllError`;
	}
}

class RecordNotFoundError extends Error {
	constructor() {
		super("Record has not found yet");
		this.name = "RecordNotFound";
	}
}

class DeleteError extends Error {
	constructor(componentName: string) {
		super('Failed to delete ' + componentName);
		this.name = `${componentName}DeleteError`;
	}
}

export {
	CreationError,
	RecordNotFoundError,
	UpdateError,
	DeleteError,
	GetAllError
};