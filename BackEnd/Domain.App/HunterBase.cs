using System;
using System.Collections;
using System.Collections.Generic;
using System.ComponentModel.DataAnnotations;
using Domain.App.Identity;
using ee.itcollege.carwash.kristjan.Domain.Base;


namespace Domain.App
{
    public class HunterBase : DomainEntityIdMetadataUser<AppUser>
    {
        [Required]
        public string NameOfBase { get; set; } = default!; 
        
        public int Coins { get; set; } = default!;

        public int LevelOfBase { get; set; } = default!;
        
        public ICollection<Building>? Buildings { get; set; }
        
        public ICollection<Hero>? Heroes { get; set; }
    }
}