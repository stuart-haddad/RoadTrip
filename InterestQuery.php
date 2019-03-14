<?php

class InterestQuery{
    private $interests=[];

    public function InterestQuery($interests){
      $this->interests = $interests;
    }

    public function addInterest($inter){
      array_push($interests,$inter);
    }

    public function removeInterest($inter){
      \unset($interest[sarray_search($inter)]);
    }

    public function getArray(){
      return $interests;
    }
