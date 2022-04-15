<?php

/*
 * To change this license header, choose License Headers in Project Properties.
 * To change this template file, choose Tools | Templates
 * and open the template in the editor.
 */

/**
 *
 * @author a
 */
interface IDao {
    function create($o);
    function delete($o);
    function update($o);
    function findById($id);
    function findAll();
}
