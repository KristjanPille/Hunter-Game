using System;
using System.Collections;
using System.Collections.Generic;
using System.ComponentModel.DataAnnotations;
using ee.itcollege.carwash.kristjan.Domain.Base;


namespace Domain.App
{
    public class Hero : DomainEntityIdMetadata
    {
        [Required]
        public string NameOfHero { get; set; } = default!;
        
        public int MaxHealth { get; set; } = default!;
        
        public int AttackDamage { get; set; } = default!;
        
        public int LevelOfHero { get; set; } = default!;
        
        public Guid? HunterBaseId { get; set; }
        public HunterBase? HunterBase { get; set; }
    }
}