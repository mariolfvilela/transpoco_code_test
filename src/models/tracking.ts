export interface Tracking {
    uid: number;
    tracker_uid: number;
    angle: number;
    speed: number;
    aquisition_time: number;
    visible_satellites: number;
    engine: string;
    event_id: number;
    event_info: number;
    insert_time: Date;
    mileage: string;
    voltage: number;
    driver_ibutton: number;
    hdop: number;
  }