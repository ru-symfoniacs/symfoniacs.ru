<?php

namespace App\Controller;

use Symfony\Bundle\FrameworkBundle\Controller\Controller;
use Symfony\Component\HttpFoundation\Response;
use Symfony\Component\Routing\Annotation\Route;

/**
 * @Route("/")
 */
class PagesController extends Controller
{

    /**
     * @Route("/", name="page_index")
     */
    public function indexAction()
    {
        $resultFile = $this->getParameter('kernel.root_dir') . '/../../web/index.html';

        return new Response(file_get_contents($resultFile), Response::HTTP_OK);
    }
}