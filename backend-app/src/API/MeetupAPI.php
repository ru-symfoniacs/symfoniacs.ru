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
    private $meetupLocalData;

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
     * Mixes local data our site into the data from meetup.com
     * @param &$events
     */
    public function mixLocalData(&$events)
    {
        $data = json_decode(file_get_contents($this->meetupLocalDataFile));
        foreach ($data as $id => $localData) {
            foreach ($events as &$event) {
                if ($event['id'] != $id) {
                    continue;
                }

                $event['extra_data']=$localData;
            }
        }
    }
}