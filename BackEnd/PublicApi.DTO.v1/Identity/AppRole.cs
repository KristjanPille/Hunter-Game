using System;
using System.ComponentModel.DataAnnotations;
using ee.itcollege.carwash.kristjan.Contracts.DAL.Base;
using ee.itcollege.carwash.kristjan.Contracts.Domain;

namespace PublicApi.DTO.v1.Identity
{
    public class AppRole : IDomainEntityId 
    {
        public Guid Id { get; set; }
        
        [MinLength(1)]
        [MaxLength(256)]
        [Required]
        public string DisplayName { get; set; } = default!;
        
        [MinLength(1)]
        [MaxLength(256)]
        [Required]
        public string Name { get; set; } = default!;

    }
}