import axios from 'axios'

class MeetupApiFacade {

    // apiUrl = "https://api.meetup.com";
    apiUrl = "http://127.0.0.1:8000/api";
    http = null;

    constructor(http) {
        this.http = http;
    }

    getAllMeetings(meetupId) {
        let url = this.apiUrl + '/' + meetupId + '/events';
        return this.http.get(url);
    }

    getMeetupInfo(meetupId) {
    }

    getMeetingInfo(meetingId) {
    }

}

export default new MeetupApiFacade(axios);