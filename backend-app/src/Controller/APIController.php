<?php

namespace App\Controller;

use App\API\MeetupAPI;
use Symfony\Bundle\FrameworkBundle\Controller\Controller;
use Symfony\Component\HttpFoundation\JsonResponse;
use Symfony\Component\HttpFoundation\Request;
use Symfony\Component\HttpFoundation\Response;
use Symfony\Component\Routing\Annotation\Route;

/**
 * @Route("/api")
 */
class APIController extends Controller
{
    /**
     * @Route("/{meetupId}/events", name="api_index")
     *
     * @param string $meetupId
     *
     * @return JsonResponse
     */
    public function eventsAction(string $meetupId)
    {
        $api = $this->get('app.meetup_api');

        $events = $api->fetchEvents($meetupId)->toArray();

        $api->mixLocalData($events);

        return new JsonResponse(
            [
                'status' => 'success',
                'events' => $events
            ],
            200,
            [
                'Access-Control-Allow-Origin' => '*'
            ]
        );
    }
}