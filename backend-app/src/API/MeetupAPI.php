<?php

namespace App\API;

use DMS\Service\Meetup\AbstractMeetupClient;
use DMS\Service\Meetup\MeetupKeyAuthClient;

class MeetupAPI
{
    private $secretKey;
    /**
     * @var AbstractMeetupClient
     */
    private $client;
    private $meetupLocalDataFile;

    public function __construct(string $secretKey, string $meetupLocalDataFile)
    {
        $this->secretKey           = $secretKey;
        $this->client              = MeetupKeyAuthClient::factory(['key' => $this->secretKey]);
        $this->meetupLocalDataFile = $meetupLocalDataFile;
    }

    public function fetchEvents($meetupId)
    {
        return $this->client->getGroupEvents(
            [
                'urlname' => $meetupId,
                'desc'    => true,
                'status'  => 'upcoming,past'
            ]
        );
    }


    /**
     * Mixes local data of our site into the data from meetup.com that fetched by MeetupAPI::fetchEvents method
     *
     * @param &$events
     */
    public function mixLocalData(&$events)
    {
        if (!file_exists($this->meetupLocalDataFile)){
            return;
        }

        $data = json_decode(file_get_contents($this->meetupLocalDataFile), true);
        if (!$data){
            return;
        }

        foreach ($events as &$event) {
            if (!isset($data[$event['id']])) {
                continue;
            }

            $event['extra_data'] = $data[$event['id']];
        }
    }
}