using System;
using System.Collections.Generic;
using System.ComponentModel.DataAnnotations;
using BLL.App.DTO.Identity;
using ee.itcollege.carwash.kristjan.Contracts.Domain;

namespace BLL.App.DTO
{
    public class HunterBase : IDomainEntityId
    { 
        [Required]
        public string NameOfBase { get; set; } = default!; 
        
        public int Coins { get; set; } = default!;

        public int LevelOfBase { get; set; } = default!;
        
        public ICollection<Building>? Buildings { get; set; }
        
        public ICollection<Hero>? Heroes { get; set; }
        
        
        public Guid AppUserId { get; set; }
        public AppUser? AppUser { get; set; }

        public Guid Id { get; set; }
    }
}