﻿using System;
using System.Collections;
using System.Collections.Generic;
using System.ComponentModel.DataAnnotations;
using ee.itcollege.carwash.kristjan.Domain.Base;


namespace Domain.App
{
    public class Building : DomainEntityIdMetadata
    {
        [Required]
        public string NameOfBuilding { get; set; } = default!;
        
        public int MaxHealth { get; set; } = default!;
        
        public int LevelOfBuilding { get; set; } = default!;
        
        
        // 1 => neutral building
        // 2 => attack building
        public int BuildingType { get; set; } = default!;
        
        public int? RangeOfBuilding { get; set; }
        
        public int? AttackDamage { get; set; }
        
        public int? AttackType { get; set; }
        
        public double? AttackSpeed { get; set; }
        
        public int? XCoordinate { get; set; } 
        public int? YCoordinate { get; set; }
        
        public Guid? HunterBaseId { get; set; }
        public HunterBase? HunterBase { get; set; }
    }
}