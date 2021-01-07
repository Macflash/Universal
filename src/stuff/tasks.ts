import { Year } from "../Resources";
import { ROUND } from "./universe";

export class Task {
    isComplete = false;
    callbacks: (() => void)[] = [];

    constructor(
        public readonly id: string,
        public readonly startYear: number,
        public readonly endYear: number,
        callback?: () => void
    ) {
        if (callback) {
            this.addOnComplete(callback);
        }
    }

    getProgress(currentYear: number) {
        if (this.isComplete) { return 1; }
        return (currentYear - this.startYear) / (this.endYear - this.startYear);
    }

    get percent() {
        return ROUND(this.getProgress(Year.current) * 100, 100);
    }

    get percentWidth() {
        return `${this.percent}%`;
    }

    addOnComplete(callback: () => void) {
        this.callbacks.push(callback);
    }

    complete(currentYear: number) {
        if (this.isComplete) { return true; }
        if (currentYear >= this.endYear && !this.isComplete) {
            this.isComplete = true;
            this.callbacks.forEach(c => c());
            return true;
        }

        return false;
    }
}

export class TaskQueue {
    private queue: Task[] = [];

    // TODO: control how these can be modified
    constructor(public limitPerId?: number, public limitPerQueue?: number) { }

    private onChange = () => {};
    Register(onchange: () => void) {
        this.onChange = onchange;
    }

    push(task: Task): Task {
        // TODO: enforce the limits!
        // add in SORTED order
        let i = 0;
        while (i < this.queue.length && this.queue[i].endYear < task.endYear) {
            i++;
        }
        this.queue.splice(i, 0, task);
        this.onChange();
        return task;
    }

    update(year: number) {
        let hasChanged = false;
        // check first items until they are all done
        while (this.queue.length && this.queue[0].endYear <= year) {
            const completedTask = this.queue.shift();
            completedTask?.complete(year);
            hasChanged = true;
        }
        if (hasChanged) {
            this.onChange();
        }
    }

    get length() {
        return this.queue.length;
    }

    count(id: string) {
        return this.queue.filter(t => t.id === id).length;
    }

    get(id: string): Task[] {
        return this.queue.filter(t => t.id === id)
    }
}

// manufacturing can only do 1 thing at a time globally
export const ManufacturingQueue = new TaskQueue(1, 1);

// research queue can do one of each at a time
export const ResearchQueue = new TaskQueue(1);

// probe queue can do all of the things
export const ProbeQueue = new TaskQueue();

// telescope can only do 1 thing at a time!
export const TelescopeQueue = new TaskQueue(1, 1);