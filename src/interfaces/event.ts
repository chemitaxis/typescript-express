/**
 * @api {OBJECT} Event Event
 * @apiGroup Custom Types
 * @apiVersion 1.1.7
 * @apiParam {Number} _id ID.
 * @apiParam {Boolean} activated Activation status.
 * @apiParam {String="Alarm", "Information", "Warning", "Error"} type Event type.
 */

interface Event {
  reset(): boolean;
}

interface EventObject {
  _id: number;
  activated: boolean;
  type: string;
}

class MyEvent implements Event {
  public id: number;
  public activated: boolean;
  public type: string;
  constructor(id, activated, type) {
    this.id = id;
    this.activated = activated;
    this.type = type;
  }

  public reset(): boolean {
    this.type = 'value';
    return true;
  }
}

export default MyEvent;
